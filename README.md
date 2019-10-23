[TOC]

# AngularContractHours

Life version demo: https://jurek2006.github.io/angular-contract-hours/

Angular application which helps reporting contractor's working hours and generate monthly working schedule in printable PDF. (It is useful when working in Poland under the type of contract which is called "umowa zlecenie").

The application is in English, but some parts are provided in Polish (as dates and report template), because I suppose it's useful only in "polish reality" (Let me know if it can be useful for you after some changes. )



## Problem to solve

The main reason for the project was (and still is) to practice making angular application from scratch and produce some useful tool.

The idea for this learning project started when I was working under the contract's type which is called in Poland "umowa zlecenie". If you work under this type of contract, according to law, you have to report amount of worked hours. 

In my case, every month I had to make a schedule, print, sign it and deliver to HR (or ACCT? It was the same department in my case ;) ). Although in some spreadsheet application it was relatively simple task, I started the project as an attempt to make the process of reporting working hours schedule more automated and even easier.

I've been developing the application, where user can easily generate the report and download it as a printable PDF file.

## Manual: How to use it

If you want to fill out the schedule and generate report follow these steps:

### 1. Provide contractor name and month

Provide contractor name, choose month you want the report for and click "Submit" button. (You can change both - name and/or month later, by pressing "Edit settings" button. But remember, if you change month, schedule you defined before will be gone)

![1571823204532](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571823204532.png)

### 2. Fill out the working schedule. 

After submitting previous form you will see a table with days of the month. Put amount of hours you worked each day. On the summary panel there will be live updated sum of scheduled hours. 

(The summary panel is is on the right side of screen on bigger resolutions and on the bottom on mobile and other narrow screens. You can find there total hours and Generate PDF/PDF button and optional defined total hours). 

By default only saturday and sunday are treated as non-working days, but you can easily change it for each day using checkboxes.



![1571823565413](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571823565413.png)



<img src="/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571823615465.png" alt="1571823615465" style="zoom:50%;" />



### 3. [Optional] Define total (expected) hours for month

You can define total hours for chosen month and the application will show if you scheduled enough/to many/ not enough hours. (By default defined total hours is turned off - you can schedule as much as you want).

The way you can turn on this option vary a bit on bigger and smaller (mobile) screens

#### Define expected total hours on bigger screens

On bigger screens (tablets, desktops) the summary panel is located on the right side of the screen. If you want define total hours (e.g.: you should schedule exactly 40h for given month) check a box "Defined total hours" and fill in amount in input next to it:

![1571825118376](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571825118376.png)

![1571825395866](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571825395866.png)

On the top of the summary panel you will find error if scheduled total hours are different than expected (defined). When you schedule right amount of hours the error will gone.

![1571825589149](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571825589149.png)

On the right side of total hours you can also see difference between currently scheduled and expected (defined) hours.

#### Define expected total hours on mobile/ smaller screens

On mobile / smaller screens the summary panel is located on the bottom of the screen. It works similar to the version on bigger screens, but some options (for now  -defining total hours only) are hidden. You can show these options by clicking the clock icon on the left side of the panel. 

<img src="/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571825912556.png" alt="1571825912556" style="zoom:50%;" />

The schedule settings will expand and there you can define expected total hours. 

<img src="/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571826423365.png" alt="1571826423365" style="zoom:50%;" />

Clicking the tick icon will close the schedule settings panel. Similarly to the bigger resolution version, proper errors will be shown on the top of the summary panel:

<img src="/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571826542975.png" alt="1571826542975" style="zoom:50%;" />



### 4. Generate PDF preview and download printable PDF

On the summary panel press the "Generate PDF" button (which is shortened to "PDF" on smaller screens). If there are any error (e.g.: amount of current and expected total hours not matching) the button will be disabled.

After clicking the button you will see a preview of the report:

![1571826842433](/home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/angular-contract-hours/README.assets/1571826842433.png)

You can download a printable PDF by pressing the "Download PDF" button. 

After pressing "Close" on the right side you will be redirected back to the schedule view.