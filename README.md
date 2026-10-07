# Vancoillie Studio website

The Next.js site is exported to `out/` and deployed to `https://software.vancoli.be/` by [the GitHub Actions workflow](.github/workflows/deploy-static-site.yml) on pushes to `main` or manually with `workflow_dispatch`.

The subdomain shares its document root with the VANCOLI site's `/software/` page. The workflow therefore publishes the Studio homepage as `studio-index.html` and installs [an Apache rewrite rule](.github/hosting/software-subdomain.htaccess) that selects it only for `software.vancoli.be/`. The VANCOLI deployment can update its own `index.html` without replacing the Studio homepage. Keep this separation when changing either deployment.

## Hostinger setup

1. Point the `software.vancoli.be` subdomain's document root to `/home/u104619329/domains/vancoli.be/public_html/software` and enable HTTPS for the subdomain.
2. Create a dedicated FTP account whose directory is `/public_html/software` (under the `vancoli.be` domain). The account's FTP root must be this directory. The workflow uploads `out/` to `./` relative to that root.
3. In the GitHub repository, set these **Actions repository secrets** under Settings → Secrets and variables → Actions:

   | Secret | Value |
   | --- | --- |
   | `FTP_SERVER` | `194.164.74.241` |
   | `FTP_USERNAME` | `u104619329.SoftwareGithub` |
   | `FTP_PASSWORD` | The current password of this dedicated FTP account (never commit it) |

4. Run **Deploy software.vancoli.be** from the Actions tab or push to `main`. Check the workflow result and open `https://software.vancoli.be/`.

Keep the FTP password only in GitHub Actions secrets. If a password was shown in a screenshot or shared elsewhere, replace it in Hostinger before using the account and save the new value as the GitHub secret.
