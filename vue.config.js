const { execSync } = require("child_process");

const command =
  'git log -n 1 --pretty=format:\'{%n  "commit": "%H",%n  "abbreviated_commit": "%h",%n  "tree": "%T",%n  "abbreviated_tree": "%t",%n  "parent": "%P",%n  "abbreviated_parent": "%p",%n  "refs": "%D",%n  "encoding": "%e",%n  "subject": "%s",%n  "sanitized_subject_line": "%f",%n  "body": "%b",%n  "commit_notes": "%N",%n  "verification_flag": "%G?",%n  "signer": "%GS",%n  "signer_key": "%GK",%n  "author": {%n    "name": "%aN",%n    "date": "%aD"%n  },%n  "commiter": {%n    "name": "%cN",%n    "date": "%cD"%n  }%n},\'\n';

buildInfo = execSync(command).toString().slice(0, -1);
process.env.VUE_APP_BUILD_INFO = buildInfo;
console.log(buildInfo);

module.exports = {};
