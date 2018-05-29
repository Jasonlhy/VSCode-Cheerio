# Objective

Integrate cheerio with vscode editor to manipulate HTML, cheerio provide method like jQuery to manipulate the HTML, it can be useful for doing some tedious task such as adding class(es), removing class(es) to some elements.

## Features

1. Click View -> Command Palette (or Ctrl + Shift + P)
2. Highlight HTML
3. Execute `Cheerio: Eval Command`, for example: `$('.apple').addClass('apple2');`
4. Enter the API command
5. The resulting HTML will replace the highlighted HTML

![Eval Command](images/cheerio_eval.gif)

## Requirements

- VSCode >= 1.2.3, cherrio is built inside this dependency, the current version is 1.0.0-rc

Please read [cheerio github](https://github.com/cheeriojs/cheerio) for API reference

## Limitation
1. The highlighted element should be a valid first children under `<body>` tag.
Therefore, if you highlight somethings like, it will not work, you need to wrap them under a table.

```
<tr>
    <td>cell1</td>
</tr>    
```

2. The resulting HTML is always decoded, no entities will be found.

## Release Notes

### 1.1.0 - 2018-05-30

Support Chinese and use HTML mode instead of XML mode

### 1.0.0 - 2018-05-29

Initial release