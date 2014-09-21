angular.module('ui.gravatar').config([
  'gravatarServiceProvider', function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      "default": 'mm'  // Mystery man as default for missing avatars
    };


  }
]);