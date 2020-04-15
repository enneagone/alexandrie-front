const { readFileSync } = require('fs');
const path = require('path');

const releaseTemplate = readFileSync(
  path.join('.', '.github', 'release-template.hbs'),
);

module.exports = {
  plugins: [
    [
      'semantic-release-gitmoji',
      {
        releaseRules: {
          major: [':boom:'],
          minor: [':sparkles:'],
          patch: [
            ':bug:',
            ':ambulance:',
            ':lipstick:',
            ':lock:',
            ':zap:',
            ':apple:',
            ':penguin:',
            ':checkered_flag:',
            ':robot:',
            ':green_apple:',
            ':chart_with_upwards_trend:',
            ':globe_with_meridians:',
            ':alien:',
            ':wheelchair:',
            ':loud_sound:',
            ':mute:',
            ':mag:',
            ':children_crossing:',
            ':speech_balloon:',
            ':iphone:',
            ':pencil2:',
            ':bento:',
          ],
        },
        releaseNotes: {
          template: releaseTemplate,
        },
      },
    ],
    '@semantic-release/github',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: ':bookmark: ${nextRelease.version}\n\n${nextRelease.notes}',
      },
    ],
  ],
};
