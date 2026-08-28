# Repository instructions

## GitHub access

- The `origin` remote uses SSH: `git@github.com:caporrfer/ibhola.git`.
- SSH authentication for the GitHub account `caporrfer` is configured on this Mac.
- Before claiming that GitHub push access is unavailable, verify it with `ssh -T git@github.com`. GitHub reports successful authentication while returning exit status 1 because it does not provide shell access.
- When the user requests changes on the development branch, work on `dev` and push to `origin/dev` after verifying the intended diff.
- Do not add the untracked `.DS_Store` file to commits.
