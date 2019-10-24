[TOC]

# AngularContractHours

Life version demo: https://jurek2006.github.io/angular-contract-hours/

As a regular Angular project you can download/clone the repository, install dependencies (`npm install` ) and run a dev server (`ng serve`) then navigate to `http://localhost:4200/`

## About AngularContractHours

AngularContractHours helps **reporting contractor's working hours** and **generate monthly working schedule in printable PDF.** (It is useful when working in Poland under the type of contract which is called "umowa zlecenie").

The application is in English, but some parts are provided in Polish (as dates and report template), because I suppose it's useful only in "polish reality" (Let me know if it can be useful for you after some changes). 

**The application is responsive** - it changes slightly its appearance and behavior on mobile (smaller) screens to remain useful. (At the moment, because of some isses [see issues on Github] - especially **not working properly PDF generation/download on mobile browsers** - it is still not very usefull on those devices).

## Problem to solve

The main reason for the project was (and still is) to **practice making angular application from scratch and produce some useful tool**.

The idea for this learning project started when I was working under the contract's type which is called in Poland "umowa zlecenie". If you work under this type of contract, according to law, you have to report amount of worked hours. 

In my case, every month I had to make a schedule, print, sign and deliver it to HR (or ACCT? It was the same department in my case ;) ). Although in some spreadsheet application it was a relatively simple task, I started the project as an attempt to make the process of reporting working hours schedule more automated and even easier.

I've been developing the application, where user can easily generate a report and download it as a printable PDF file.

## Manual: How to use it

If you want to fill out the schedule and generate a report follow these steps:

### 1. Provide contractor name and month

Provide contractor name, choose month you want the report for and click "Submit" button. (You can change both - name and/or month later, by pressing "Edit settings" button. But remember, if you change month, schedule you defined before will be gone)

![1571823204532](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571823204532.png)

### 2. Fill out the working schedule. 

After submitting previous form you will see a table with days of the month. Put the amount of hours you worked each day. On the summary panel there will be live updated sum of scheduled hours. 

(The summary panel is on the right side of the screen on bigger resolutions and on the bottom on mobile and other narrow screens. You can find there total hours and Generate PDF/PDF button and optional defined total hours). 

By default only Saturdays and Sundays are treated as non-working days, but you can easily change it for each day using checkboxes.



![1571823565413](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571823565413.png)



<img src="/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571823615465.png" alt="1571823615465" style="zoom:50%;" />



### 3. [Optional] Define total (expected) hours per month

You can define total hours for chosen month and the application will show if you scheduled enough/too many/ not enough hours. (By default defined total hours is turned off - you can schedule as much as you want).

The way you can turn on this option vary a bit on bigger and smaller (mobile) screens

#### Define expected total hours on bigger screens

On bigger screens (tablets, desktops) the summary panel is located on the right side of the screen. If you want defined total hours (e.g.: you should schedule exactly 40h for given month) check a box "Defined total hours" and fill in amount in input next to it:

![1571825118376](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571825118376.png)

![1571825395866](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571825395866.png)

On the top of the summary panel you will find error if scheduled total hours are different than expected (defined). When you schedule right amount of hours the error will be gone.

![1571825589149](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571825589149.png)

On the right side of total hours you can also see difference between currently scheduled and expected (defined) hours.

#### Define expected total hours on mobile/ smaller screens

On mobile / smaller screens the summary panel is located on the bottom of the screen. It works similarly to the version on bigger screens, but some options (for now - defining total hours only) are hidden. You can show these options by clicking the clock icon on the left side of the panel. 

<img src="/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571825912556.png" alt="1571825912556" style="zoom:50%;" />

The schedule settings will expand and there you can define expected total hours. 

<img src="/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571826423365.png" alt="1571826423365" style="zoom:50%;" />

Clicking the tick icon will close the schedule settings panel. Similar to the bigger resolution version, proper errors will be shown on the top of the summary panel:

<img src="/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571826542975.png" alt="1571826542975" style="zoom:50%;" />



### 4. Generate PDF preview and download printable PDF

On the summary panel press the "Generate PDF" button (which is shortened to "PDF" on smaller screens). If there is any error (e.g.: amount of current and expected total hours not matching) the button will be disabled.

After clicking the button you will see a preview of the report:

![1571826842433](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571826842433.png)

You can download a printable PDF by pressing the "Download PDF" button. (As mentioned in paragraph "Known issues" - **at the moment downloading PDFs doesn't work on most of the mobile browsers.** :( )

After pressing "Close" on the right side you will be redirected back to the schedule view.

## Technologies used

The project was started in **Angular 7** and updated to **Angular 8**. 

It uses some features from **Angular Material** like inputs, buttons, chechbox. 

For generating PDF documents it uses together **jspdf** (https://github.com/MrRio/jsPDF) and **html2canvas** (https://html2canvas.hertzen.com/) - the latter simplifies producing styled content for PDFs. With it you just need to generate elements with data as HTML and CSS, and html2canvas converts it to image which is easily placed in pdf by jspdf. (But html2canvas creates images only in low resolution, so it was needed to implement my own scaling solution, based on styling to make element to be very big - to get an image in high resolution after placing it on A4 sheet).

**Moment.js** (https://momentjs.com/) helps working with dates (i.e. generating consecutive months, generating consecutive days in a month or getting a day of the week).

**lodash/cloneDeep** was used to prevent mutations of data handled in services and returned by its methods.

To improve the quality of code I used **Prettier** & **tslint** during the development.

## Known issues

At the moment, the biggest problem is not working properly PDF generation/downloading on mobile browsers. It is connected with jsPDF, which is responsible for this task. 

This issue prevents the application from being useful on mobile devices so it is the most important at the moment to be solved.

I also found some other problems (to be solved in the future as well):

- Application is cumbersome in use on mobile devices in landscape orientation.
- Opened schedule settings has wrong height on safari mobile.
- Summary panel is "jumping" when defined total hours enabled.
- The report header and footer not shown properly on opera mobile. 

To read more about the issues you can see the Issues section on this repository. 

## Future plans for improvement

The most important thing, at the moment, is to provide working PDF generating for mobile browsers. After resolving this issue and other known minor problems I would like to improve the application with:

- fetching non-working days (such as holidays) from some API
- option to generate random working schedule (i.e. user wants to schedule 40 hours in given month, defines constrains as default/minimum/maximum amount of hour per each day)
- other features asked by users