# [randmly](http://randmly.com)

## Quick Start:

Clone:
```ShellSession
https://github.com/flaviocarvalho/randmly-angular
```

Install dependencies:
```ShellSession
npm i
```

Add Settings:

```ShellSession
// settings.json
{
	"galaxy.meteor.com": {
		"env": {
			"MONGO_URL": "mongodb://USERNAME:PASSWORD@URL:PORT/NAME"
		}

	},
	"private": {
		"oAuth": {
			"instagram": {
				"clientId": "ID",
				"redirect_uri": "localhost:3000/_oauth/instagram",
				"secret": "SECRET"
			},
			"facebook": {
				"appId": "ID",
				"redirect_uri": "localhost:3000/_oauth/facebook",
				"secret": "SECRET"
			}
		}
	}
}
```

Start:

```ShellSession
npm start
```

---

## Future Changes:

* Moving towards React/Redux
* Adding more social media accounts
* Create a React-Native App
