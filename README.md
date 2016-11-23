# Qlik Sense Smart Export (based on the Extension Dev tool from Erik Wetterberg)
# Author Ivan Felipe ife@qlik.com QlikTech Iberia
# Contributors : Sergi Vives Qlik UX designer.
Special thanks to Sergi for his expertise and knowledge transfer in web design.
Thanks to Erik Wetterberg for his fantastic Extension Dev Tool, that lets me imagine new powerful functionalities.

Smart Export extension for Qlik Sense

##Allows the user to export to Excel all the pivot and straight tables respecting the native look and feel (colors, bold, titles, current selections...).

This extension adds a floating action button to your straight and pivot tables.
When you press the button it will show an icon over the table objects to allow export.

It exports the table as a spreadsheet, that Excel can manage.


### Version 1

1. Basic export only to XLS

Current Issues:
- it only exports the info that is shown in the screen, existing info only available with scrolling won't be exported.