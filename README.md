# a11ycheck
This project is a CSS and JS based accessibility (a11y) structure manual checking tool.  It is comprised of a main CSS file (a11y.css) that shows the user the different HTML and ARIA structural markup on the page using pseudo before and after.  Some elements do not support these CSS properties and thus a JS file is also associated with the Chrome extension.  This git is a setup to be a Chrome extension but you can simply use the main a11y.css file in any browser or create a bookmarklet.  Clicking the extension on the active tab will apply the CSS and JS to that Chrome tab.  In addition, a context menu is provided with additional favlets for manual testing such as grayscale, linearize table, remove CSS, darken, enhance focus, show lang attributes, show title attributes, show complex table headers associated with a each cell, and an ARIA properties displaying option -- some of hte favlets are part of the extension while others are linked on my mraccess77.github.io project site.

As this extension is not yet in the Chrome Store -- go to chrome:extensions and check the developer mode checkbox.  Choose the load unpacked extendtion and point to the folder where you have downloaded this git to.  The extension should now be available.

Note: The darken option is just an added option to make page text black and all link text dark blue and underlined to make the page easier to see for the user.  I personally find reading pages with light gray text difficult.  The enahanced focus indicator makes it easier to track what element has keyboard focus and is useful in testing but can also be useful for people who have a hard time locating the focus indicator.

<table>
  <colgroup>
    <col span="1" style="width:20%;" >
    <col span="1" style="width:20%;" >
    <col span="1" style="width:60%;" >
  </colgroup>  
  <thead>
    <tr>
      <th style="width:20%;">Element</th> 
      <th>indicator</th>
      <th>border</th>
    </tr>
  </thead>
  <tbody>
<tr>
  <td>ARIA landmarks</td>
  <td>name on brown background (app, nav, main, ban, form, search, coninfo, reg, asd (complementary)</td>
  <td>orange</td>
</tr>
<tr>
  <td>ARIA roles</td>
  <td>name on brown backgroound</td>
  <td>sienna (brownish orange)</td>
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
  <td>abr</td>
  <td>cyan</td>
</tr>
<tr>
  <td>address</td>
  <td>adr</td>
  <td>orange</td>
</tr>
<tr>
  <td>applet</td>
  <td>none</td>
  <td>yellow</td>
</tr>
<tr>
  <td>audio</td>
  <td>aud</td>
  <td>yellow</td>
</tr>
<tr>
  <td>button</td>
  <td>b</td>
  <td>cyan</td>
</tr>
<tr>
  <td>canvas</td>
  <td>can</td>
  <td><dashed pink/td>
</tr>
<tr>
  <td>caption</td>
  <td>cap</td>
  <td>yellow</td>
</tr>
<tr>
  <td>dialog</td>
  <td>dlg</td>
  <td>orange</td>
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
  <td>none</td>
  <Td>green dotted</td>
</tr>
<tr>
  <td>h1 - h6</td>
  <td>h1-h6</td>
  <td>lightblue</td>
</tr>
<tr>
  <td>label</td>
  <Td>lbl</td>
  <td>gold</td>
</tr>
<tr>
  <td>legend</td>
  <Td>none</td>
  <td>gold dashed</td>
</tr>
<tr>
  <td>lang</td>
  <td>lang code in white on dark blue</td>
  <td>none</td>
</tr>
<tr>
  <td>li</td>
  <td>li</td>
  <td>purple</td>
</tr>
<tr>
  <td>main, nav, section, article, aside, 
  header, footer, address, dialog</td>
  <td>main, nav, sec, art, asd,hdr, ftr, adr, dlg</td>
  <td>orange</td>
</tr>
<tr>
  <td>object</td>
  <td>none</td>
  <td>yellow</td>
</tr>
<tr>
  <td>ol</td>
  <td>ol</td>
  <Td>cyan</td>
</tr>
<tr>
  <td>onclick attribute</td>
  <td>oc</td>
  <Td>purple</td>
</tr>

<tr>
  <td>svg</td>
  <td>svg</td>
  <td>pink</td>
</tr>
<tr>
  <td>summary attribute</td>
  <td>text of attribute in white on red background</td>
  <td></td>
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
<tr>
  <td>title attribute</td>
  <td>none</td>
  <td>dotted gray border</td>
</tr>
<tr>
  <td>tabindex attribute</td>
  <td>tbx (does not always show)</td>
  <td>dotted blue border</td>
</tr>
  <Td>video</td>
  <td>none</td>
  <td>yellow</td>
</tr>
</tbody>
</table>


