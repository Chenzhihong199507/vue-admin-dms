pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: GIT_REPO_URL,
          credentialsId: CREDENTIALS_ID
        ]]])
      }
    }

    stage('构建镜像并推送到 CODING Docker 制品库') {
      steps {
        sh '''cat << EOF >> .env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
SERVER_URL=${SERVER_URL}
APP_KEYS=kiviTaMkfhjuCIWZ2daocaTw==,AAK3XfQGDMxV314/3GqVR/0w==,aBiLpm624124oHm48+Ux9eoYaw==,7kbsX4dfo4V4RQcIKugX0fzg==
API_TOKEN_SALT=OE7YxSwJE455SZqi3Zf9ucexQ==
ADMIN_JWT_SECRET=hELs23ekIijXoyGw8GcTK8Jg==
JWT_SECRET=i56jKaSF443eSuwlwHVMZBFPw==
DATABASE_HOST=db.huiwei.tech
DATABASE_PORT=3306
DATABASE_USERNAME=jcsj
DATABASE_PASSWORD=eGXa26yJBpcNRfba
EOF
'''
        sh "docker build -t ${CODING_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION} -f ${DOCKERFILE_PATH} ${DOCKER_BUILD_CONTEXT}"
        useCustomStepPlugin(key: 'coding-public:artifact_docker_push', version: 'latest', params: [image:"${CODING_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}",repo:"${DOCKER_REPO_NAME}",properties:'[]'])
      }
    }

    stage('部署到远端服务') {
      steps {
        script {
          def remoteConfig = [:]
          remoteConfig.name = "my-remote-server"
          remoteConfig.host = "${REMOTE_HOST}"
          remoteConfig.port = "${REMOTE_SSH_PORT}".toInteger()
          remoteConfig.allowAnyHosts = true

          withCredentials([
            sshUserPrivateKey(
              credentialsId: "${REMOTE_CRED}",
              keyFileVariable: "privateKeyFilePath"
            ),
            usernamePassword(
              credentialsId: "${CODING_ARTIFACTS_CREDENTIALS_ID}",
              usernameVariable: 'CODING_DOCKER_REG_USERNAME',
              passwordVariable: 'CODING_DOCKER_REG_PASSWORD'
            )
          ]) {
            // SSH 登陆用户名
            remoteConfig.user = "${REMOTE_USER_NAME}"
            // SSH 私钥文件地址
            remoteConfig.identityFile = privateKeyFilePath

            // 请确保远端环境中有 Docker 环境
            sshCommand(
              remote: remoteConfig,
              command: "docker login -u ${CODING_DOCKER_REG_USERNAME} -p ${CODING_DOCKER_REG_PASSWORD} ${CODING_DOCKER_REG_HOST}",
              sudo: true,
            )

            // DOCKER_IMAGE_VERSION 中涉及到 GIT_LOCAL_BRANCH / GIT_TAG / GIT_COMMIT 的环境变量的使用
            // 需要在本地完成拼接后，再传入到远端服务器中使用
            DOCKER_IMAGE_URL = sh(
              script: "echo ${CODING_DOCKER_REG_HOST}/${CODING_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}",
              returnStdout: true
            )

            sshCommand(
              remote: remoteConfig,
              command: "docker pull ${DOCKER_IMAGE_URL}",
              sudo: true,
            )

            sshCommand(
              remote: remoteConfig,
              command: "docker rm -f saledress-dms | true",
              sudo: true,
            )

            sshCommand(
              remote: remoteConfig,
              command: "docker run -d -p 9000:1337 -v /var/lib/docker/volumes/saledress-dms/public:/app/public --name saledress-dms ${DOCKER_IMAGE_URL}",
              sudo: true,
            )

            echo "部署成功，请到 http://${REMOTE_HOST}:80 预览效果"
          }
        }

      }
    }

  }
  environment {
    CODING_DOCKER_REG_HOST = "${CCI_CURRENT_TEAM}-docker.pkg.${CCI_CURRENT_DOMAIN}"
    CODING_DOCKER_IMAGE_NAME = "${PROJECT_NAME.toLowerCase()}/${DOCKER_REPO_NAME}/${DOCKER_IMAGE_NAME}"
  }
}
