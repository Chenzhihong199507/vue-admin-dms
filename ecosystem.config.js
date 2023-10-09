module.exports = {
  apps: [
    {
      name: 'jcsj-dms',   // 应用名称，不多解释
      exec_mode: 'cluster',  // 默认为fork
      instances: '1', // Or a number of instances ，这里可以根据机器配置自行修改i
      script: './node_modules/@strapi/strapi/bin/strapi.js',
      args: 'start'
    }
  ]
}
