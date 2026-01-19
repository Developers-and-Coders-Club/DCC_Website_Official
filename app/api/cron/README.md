# Cron Jobs Setup

This directory contains cron job endpoints for automated data fetching.

## Available Cron Jobs

### 1. Fetch Codeforces Data

**Endpoint**: `/api/cron/fetch-codeforces`
**Purpose**: Updates the 21 Days Coding Challenge leaderboard with latest Codeforces data
**Frequency**: Recommended every 1 hour

### 2. Fetch GitHub Data

**Endpoint**: `/api/cron/fetch-github`
**Purpose**: Updates the SANGAAM leaderboard with latest GitHub contributions
**Frequency**: Recommended every 6 hours (to avoid rate limiting)

## Setup Instructions

### Option 1: Vercel Cron Jobs (Recommended)

1. Create `vercel.json` in project root:

```json
{
  "crons": [
    {
      "path": "/api/cron/fetch-codeforces",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/fetch-github",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

2. Add `CRON_SECRET` to your environment variables in Vercel
3. Deploy to Vercel

### Option 2: External Cron Service (e.g., cron-job.org)

1. Set up a cron job to call:
   - `https://your-domain.com/api/cron/fetch-codeforces`
   - `https://your-domain.com/api/cron/fetch-github`

2. Add Authorization header:

   ```
   Authorization: Bearer YOUR_CRON_SECRET
   ```

3. Set schedule:
   - Codeforces: Every hour
   - GitHub: Every 6 hours

### Option 3: GitHub Actions

Create `.github/workflows/update-leaderboards.yml`:

```yaml
name: Update Leaderboards

on:
  schedule:
    - cron: "0 * * * *" # Every hour for Codeforces
    - cron: "0 */6 * * *" # Every 6 hours for GitHub
  workflow_dispatch: # Manual trigger

jobs:
  update-codeforces:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Codeforces Update
        run: |
          curl -X GET \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            https://your-domain.com/api/cron/fetch-codeforces

  update-github:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger GitHub Update
        run: |
          curl -X GET \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            https://your-domain.com/api/cron/fetch-github
```

## Environment Variables Required

Add these to your `.env.local` and Vercel:

```env
# Cron Job Security
CRON_SECRET=your-random-secret-string-here

# Already configured:
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token
CODEFORCES_GYM_ID=664790
GITHUB_REPO_OWNER=darshan2006-op
GITHUB_REPO_NAME=academic-planner-deadline-tracker
```

## Testing Locally

```bash
# Test Codeforces cron
curl -X GET \
  -H "Authorization: Bearer your-cron-secret" \
  http://localhost:3000/api/cron/fetch-codeforces

# Test GitHub cron
curl -X GET \
  -H "Authorization: Bearer your-cron-secret" \
  http://localhost:3000/api/cron/fetch-github
```

## Rate Limiting

### Codeforces API

- Limit: 1 call per 2 seconds
- Our implementation: Batches all handles in one call
- Safe frequency: Every hour

### GitHub API

- Limit: 5000 requests/hour with token
- Our implementation: 1 request per participant + PR details
- Safe frequency: Every 6 hours for 50+ participants

## Monitoring

Check cron job execution:

1. View Vercel logs for cron executions
2. Check MongoDB `leaderboards` collection for `lastFetched` timestamp
3. Monitor API response times

## Troubleshooting

### Cron not running

- Verify `CRON_SECRET` is set correctly
- Check Vercel cron logs
- Ensure endpoints are accessible

### Rate limiting errors

- Reduce cron frequency
- Verify GitHub token has sufficient quota
- Add delays between API calls

### Data not updating

- Check MongoDB connection
- Verify participants have linked accounts
- Review error logs in Vercel

## Security

- ✅ Cron endpoints protected with secret token
- ✅ Only accessible via Authorization header
- ✅ No public access without authentication
- ✅ Environment variables for sensitive data
