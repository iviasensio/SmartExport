# Qlik Sense Smart Export
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
![alt tag](https://raw.githubusercontent.com/iviasensio/Guides/main/SmartExport/SmartExport1.png)
![alt tag](https://raw.githubusercontent.com/iviasensio/Guides/main/SmartExport/SmartExport2.png)
![alt tag](https://raw.githubusercontent.com/iviasensio/Guides/main/SmartExport/SmartExport3.png)

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

### Version 6 (2-nov-2021):
- Improve PivotTable export to xls:
	- keep the dimension labels
	- control de width of the columns
- The google icons library has been replaced by leonardo.js, a Qlik native one (no more issues rendering icons in SaaS and no internet access using Windows versions)
- FileSaver.js updated

### Version 7 (4-Apr-2024):
- Few bugs fixed related to the existence of title or not

### Version 8 (29-Jul-2024):
- Allow the use in mashups
  Now the SmartExport extension works in mashups.
  Just call the extension object by its ID and allocate it wherever, even in a hidden way with 1px width.
  The export icon will appear on top of straight and pivot tables and will export successfully the data preserving original look&Feel
