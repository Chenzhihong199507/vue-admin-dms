export default {
    config: {
      locales: [
        // 'zh-Hans',
      ],
      translations: {
        'en': {
          'Auth.form.welcome.title': 'Welcome',
          'Auth.form.welcome.subtitle': 'Log in to your account',
          'Auth.form.email.placeholder': 'geo@huiwei.tech',
          'app.components.LeftMenu.navbrand.title': 'HuiWei CMS Dashboard',
          'app.components.BlockLink.tutorial.content': 'Follow step-by-step instructions to use and customize HuiWei CMS.',
          'app.components.HomePage.welcomeBlock.content': 'We are giving our best to improve the product based on your feedback.',
          'app.components.HomePage.welcomeBlock.content.again': 'We are giving our best to improve the product based on your feedback.',
          'Settings.application.strapiVersion': 'Version',
          'notification.version.update.message': 'A new version of HuiWei CMS is available!'
        },
      },
      // Disable video tutorials
      tutorials: false,
      // Disable notifications about new Strapi releases
      notifications: { release: false },
    },
    bootstrap(app) {
      console.log(app);
    },
  };
  