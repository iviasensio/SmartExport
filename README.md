# Qlik Sense Smart Export (based on the Extension Dev tool from Erik Wetterberg)
# Author Ivan Felipe ife@qlik.com QlikTech Iberia
# Contributors : Sergi Vives Qlik UX designer.
Special thanks to Sergi for his expertise and knowledge transfer in web design.
Thanks to Erik Wetterberg for his fantastic Extension Dev Tool, that lets me imagine new powerful functionalities.

Smart Export extension for Qlik Sense

##Allows the user to export all the pivot and straight tables respecting the native look and feel (colors, bold, titles, current selections...).

This extension adds a floating action button to your straight and pivot tables.
When you press the button it will show an icon over the table objects to allow export.

It exports the table as a spreadsheet, that Excel can manage.

### Look
![alt tag](https://github.com/iviasensio/Guides/blob/master/SmartExport/SmartExport1.png)
![alt tag](https://github.com/iviasensio/Guides/blob/master/SmartExport/SmartExport2.png)
![alt tag](https://github.com/iviasensio/Guides/blob/master/SmartExport/SmartExport3.png)

### Version 1

1. Basic export only to XLS

Version 1 Issues:
- it only exports the info that is shown in the screen, existing info only available with scrolling won't be exported.


### Version 2
Export to XLS and Word
Export all the table content, even the not visible content in the screen,
for doing that it's need to have a preview in order to allow to extend all the html code of the table


### Version 3
Improvements exporting to XLS:
- remove buttons 'load more'
- allow right resize of width columns for pivot tables
Allows exporting to PDF


### Version 4 (26-oct-2020):
- Allow to decide if you want to exoprt title, subtitle, footer and current selections
- Better files organization

### Version 5 (24-nov-2020):
- Allow to decide if you want to exoprt title, subtitle, footer and current selections also in PDF
- Fix some bugs in Word and PDF export, still showing 'Table' labels and others
