# Weather-App

Simple Weather App Project for Portfolio

## How to start?

1. Download repository

2. Run in console in the repository folder

```bash
npm install
```

3. Run

```bash
npm start
```

##OR 

Visit the website:
https://weather-app-szymon.netlify.app/

## How the app works

When loading the app user is being asked to give localization.
IF localization is not given then app loads default background (blue gradient)

IF localization is given then query API by user localization.
Background shown here is represented according to user localization data. So if it's rainy day the user would see rainy day background :)

IF you search a city and go back to main menu the background would change according to last search

Every information is stored in app state.

There is also a theme form to see all possible themes for the app. (It is not really usefull for user but I've just done it for scss and js practice purposes and handling forms with js).

> **NOTE: All backgrounds were made by me in photoshop:)**

## How background is rendered?

There are 3 divs

- main background
- precipitation (snow, rain)
- thunder

Background is created of two parts - **weather** and **time**

**Weather** options:

- sunny
- rainy
- snowy
- cloudy
- cloudy-scattered

**Time** options:

- morning
- day
- evening
- night

For example: sunny-morning

**IF** rainy or snowy is selected then app renders precipitation as well

> NOTE: Also needs **time variant**

**Preciptiation** options:

- rain
- snow

For example: rain--night

> NOTE: Two dashes here

> NOTE: Rain can be also with thunder. For thunder it shows rainy theme and rain

> NOTE: Backgrounds are not shown precisely according to weather. Some rare atmospheric conditions are not shown and changed as one of backgrounds

## How time is calculated?

> NOTE: Time is ALWAYS rounded to full hours. So 11:30 would be 12. 11:29 would be 11

> NOTE: IF value for time end and time start are the same then start wins. So if it's 11:39 then day is shown

### Morning

**Starts at:** Sunrise (recieved from API)
**Ends at:** 12

### Day

**Starts at:** 12:00
**Ends at:** Sunset - 2 hours (recieved from API)

Example: Sun sets at 17:21. Number is rounded down to 17. 2 hours are deducted. Final day end hour: 15:00

### Evening

**Starts at:** Sunset (recieved from API)
**Ends at:** Sunrise

### Evening

**Starts at:** Sunrise (recieved from API)
**Ends at:** Sunset (recieved from API)

## Used API:

Used API:
https://openweathermap.org/

This variant used:
https://openweathermap.org/current

See how IDs are translated to background:
https://openweathermap.org/weather-conditions

Filter color generator:
https://codepen.io/sosuke/pen/Pjoqqp

## Used Technologies

- HTML
- SCSS
- Vanilla JavaScript
- NPM
- Git

Project build in JS MVC architecture

Project done by Szymon Włoszyński, 2022
