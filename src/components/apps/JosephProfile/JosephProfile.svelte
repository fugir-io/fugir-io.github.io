<script lang="ts">
  import { theme } from '🍎/stores/theme.store';
  import BlogIcon from '~icons/mdi/grease-pencil';
  import GithubIcon from '~icons/mdi/github';

  function external(node: HTMLAnchorElement) {
    node.rel = 'noopener noreferrer';
    node.target = '_blank';
  }
</script>

<section class="container">
  <header class="titlebar app-window-drag-handle">
    <span>About the Developer</span>
  </header>

  <aside class:light={$theme.scheme === 'light'}>
    <nav>
      <a href="https://codeblind.ai/blog" use:external> <BlogIcon /> Blog </a>
      <hr />
      <a href="https://github.com/josephbarnett" use:external> <GithubIcon /> Github </a>
      <hr />
      <a
        href="https://github.com/josephbarnett/cv/releases/download/v0.0.1/resume.pdf"
        use:external
      >
        <GithubIcon /> Professional Resume
      </a>
    </nav>
  </aside>

  <section class="content">
    <img height="200" width="200" src="/jb-profile/jb.webp" alt="Joseph Barnett" />

    <br />

    <h1>Hi, I'm Joseph Barnett</h1>

    <br />
    <h2>Distinguished Architect and Full Stack Developer</h2>
    <br />

    <p>
      I believe in, “Being the change that you want to see in the world!” Whether it a project has
      with little or no guidance, requiring globally distributed teams, or solutions which require
      rapid learning or creating new technologies; I enjoy a challenge. I am happiest when I have an
      opportunity to learn. I love to innovate new technologies which provide great value. These
      traits drive my passion for technology.
    </p>
    <br />
    <p>
      Whether it's a project with little or no guidance, requiring globally distributed teams, or
      solutions which require rapid learning or creating new technologies; I enjoy the challenge. I
      am happiest when I have an opportunity to learn new technologies, innovate with a team, and
      push the boundaries of "what is possible".
    </p>

    <br /><br />

    <h2>Why Me?</h2>
    <p>
      Firstly, I work great on Teams understanding it is easy to run fast, but more important to run
      with the tribe. I am a leader with the ability influence technical and business outcomes,
      delivering innovative technology solutions, while maintaining a fantastic culture. I believe
      in focusing on our customers first, clean-thoughtful design, and innovating using LEAN-MVP
      principals to validate our outcomes.
    </p>

    <br /><br />
    <h3><b>Let me be the change maker you need - check out me resume!</b></h3>
    <br /><br />
    <h2><b>Let Go!</b></h2>
    <br /><br />
    <br /><br />
    <br /><br />
    <br /><br />
    <br /><br />
  </section>
</section>

<style lang="scss">
  .container {
    --color: var(--system-color-light-hsl);

    display: grid;
    grid-template-columns: 12rem 1fr;
    grid-template-rows: 3rem 1fr;

    border-radius: inherit;

    background-image: linear-gradient(
      to right,
      hsla(var(--color), 0.7) 12rem,
      hsla(var(--color), 1) 12rem 100%
    );

    transition: --color 200ms ease-in;

    color: var(--system-color-dark);
  }

  .titlebar {
    grid-area: 1 / 1 / span 1 / span 2;

    display: flex;
    justify-content: center;

    z-index: 1;

    padding: 0.9rem 1rem;

    width: 100%;

    border-top-left-radius: inherit;
    border-top-right-radius: inherit;

    user-select: none;

    span {
      color: hsla(var(--system-color-dark-hsl), 0.8);
      font-weight: 500;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
    }
  }

  aside {
    grid-area: 1 / 1 / span 2 / span 1;

    transform: translateZ(0);

    height: calc(100% - 2.7px);
    width: calc(12rem - 2.27px);

    margin: 1.8px 0 0px 1.8px;

    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: inherit;

    &::before {
      content: '';

      width: inherit;
      height: inherit;

      border-radius: inherit;

      position: fixed;
      left: 0;
      top: 0;

      z-index: -1;
      backdrop-filter: blur(12px);
    }

    &.light {
      height: calc(100% - 3px);
      width: calc(12rem - 2.5px);

      margin: 1.7px 0 0px 1.7px;

      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;

      margin: 4rem 0.6rem;

      hr {
        display: block;

        width: 100%;
        height: 1px;

        background-color: hsla(var(--system-color-dark-hsl), 0.2);

        border: none;
      }

      a {
        display: flex;
        gap: 0.4rem;
        align-items: center;

        color: hsla(var(--system-color-dark-hsl), 0.9);
        text-decoration: none;
        font-weight: 400;

        padding: 0.5rem 0.5rem;

        border-radius: 0.4rem;

        transition: background-color 100ms ease;

        &:hover {
          background-color: hsla(var(--system-color-dark-hsl), 0.2);
        }
      }
    }
  }

  .content {
    grid-area: 2 / 2 / span 1 / span 1;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1rem;

    img {
      border-radius: 50%;
    }
    // Add styles for scrolling
    overflow-y: auto; // Enable vertical scrolling
    max-height: calc(100vh - 3rem); // Set maximum height to fit within viewport, adjust as needed
  }

  .scrollable-content {
    padding: 1rem; // Add padding to prevent content from touching the edges
  }

  .emoji {
    height: 1em;
    width: 1em;

    vertical-align: middle;
  }

  h1 {
    font-size: 2.618rem;
    line-height: 1.618;
  }

  h2 {
    font-size: 1.618rem;
    line-height: 1.2;
  }

  p {
    line-height: 1.618rem;
  }
</style>
