# a11ycheck
This project is a CSS and JS based accessibility (a11y) Structure manual checking tool.  It is a CSS file that shows the user the different HTML and ARIA structural markup on the page using pseudo before and after.  Some element do not support these CSS properties and thus a JS file is also associated with it.  This git is a setup to be a Chrome extension.  Clicking the extension on the active tab will apply the CSS and JS to that tab.  In addition, a context menu is provided with additional favlets for manual testing that are posted on my mraccess77.github.io project site.

As this extension is not yet in the Chrome Store -- go to chrome:extensions and check the developer mode checkbox.  Choose the load unpacked extendtion and point to the folder where you have downloaded this git to.  The extension should now be available.

The darken option is just an added option to make page text black and all link text dark blue and underlined to make the page easier to see for the user.  I personally find reading pages with light gray text difficult.

<table>
<tr>
  <thead>
    <col width="20%" />
    <col width="20%" />
    <col width="60%" />
  </thead>
  <th>Element</th> 
  <th>indicator</th>
  <th>border</th>
</tr>
<tr>
  <td>ARIA landmarks</td>
  <td>name on brown background</td>
  <td>orange</td>
</tr>
<tr>
  <td>ARIA roles</td>
  <td>name on brown backgroound</td>
  <td>none</td>
</tr>
<tr>
  <td>a</td>
  <td>a</td>
  <td>cyan</td>
</tr>
<tr>
  <td>area</td>
  <td>area</td>
  <td>cyan</td>
</tr>
<tr>
  <td>abbr</td>
  <td>abbr</td>
  <td>cyan</td>
</tr>
<tr>
  <td>applet</td>
  <td></td>
  <td>yellow</td>
</tr>
<tr>
  <td>audio</td>
  <td>none</td>
  <td>yellow</td>
</tr>
<tr>
  <td>button</td>
  <td>b</td>
  <td>cyan</td>
</tr>
<tr>
  <td>canvas</td>
  <td></td>
  <td><dashed pink/td>
</tr>
<tr>
  <td>caption</td>
  <td>cap</td>
  <td>yellow</td>
</tr>
<tr>
  <td>dl</td>
  <td>dl</td>
  <td>purple</td>
</tr>
<tr>
  <td>img</td>
  <td>alt</td>
  <td>pink</td>
</tr>
<tr>
  <td>form</td>
  <td>none</td>
  <td>organge</td>
</tr>
<tr>
  <td>iframe</td>
  <td></td>
  <Td>green dotted</td>
</tr>
<tr>
  <td>h1 - h6</td>
  <td>h1-h6</td>
  <td>lightblue</td>
</tr>
<tr>
  <td>label</td>
  <Td></td>
  <td>gold</td>
</tr>
<tr>
  <td>label</td>
  <Td></td>
  <td>gold dashed</td>
</tr>
<tr>
  <td>li</td>
  <td>li</td>
  <td>purple</td>
</tr>
<tr>
  <td>main, nav, section, article, aside, 
  header, footer, address, dialog</td>
  <td>none</td>
  <td>orange</td>
</tr>
<tr>
  <td>object</td>
  <td></td>
  <td>yellow</td>
</tr>
<tr>
  <td>ol</td>
  <td>ol</td>
  <Td>purple</td>
</tr>
<tr>
  <td>svg</td>
  <td>svg</td>
  <td>pink</td>
</tr>
<tr>
  <td>table</td>
  <td>table</td>
  <td>red solid</td>
</tr>
<tr>
  <td>td</td>
  <td>none</td>
  <td>red dashed</td>
</tr>
<tr>
  <td>th</td>
  <td>none</td>
  <td>red dotted</td>
</tr>
<tr>
  <td>ul</td>
  <td>ul</td>
  <Td>purple</td>
</tr>
<Tr>
  <td>title attribute</td>
  <td>none</td>
  <td>dotted gray border</td>
</tr>
  <Td>video</td>
  <td></td>
  <td>yellow</td>
</tr>  
</table>


