AccountsTemplates.configure({
  defaultLayout: 'userFormsLayout',
  defaultContentRegion: 'content',
  confirmPassword: false,
  enablePasswordChange: true,
  sendVerificationEmail: true,
  showForgotPasswordLink: true,
  onLogoutHook() {
    const homePage = 'home';
    if (FlowRouter.getRouteName() === homePage) {
      FlowRouter.reload();
    } else {
      FlowRouter.go(homePage);
    }
  },
});

['signIn', 'signUp', 'enrollAccount'].forEach(
  (routeName) => AccountsTemplates.configureRoute(routeName));

// We display the form to change the password in a popup window that already
// have a title, so we unset the title automatically displayed by useraccounts.
AccountsTemplates.configure({
  texts: {
    title: {
      changePwd: '',
    },
  },
});

Meteor.startup(function() {

    ServiceConfiguration.configurations.update(
      { "service": "github" },
      {
        $set: {
          "clientId": "{{Meteor.settings.public.githubClientId}}",
          "secret": "{{Meteor.settings.public.githubSecret}}"
        }
      },
      { upsert: true }
    );
})