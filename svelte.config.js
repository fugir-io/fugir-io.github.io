import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess({
    replace: [['__DATE__', new Date().toISOString()]],

    env: [['PUBLIC_AUTH0_DOMAIN', 'dev-06jbbbvvhpso2wm1.us.auth0.com']],
    env: [['PUBLIC_AUTH0_CLIENT_ID', 'kukbzOeytRYmTtAdZy3QFuBfPKPSOgzZ']],
    env: [['PUBLIC_AUTH0_CALLBACK_URL', 'http://fugir.io/callback']],
  }),
};
