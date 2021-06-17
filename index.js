const moment = require("moment");

const parseManipulateFormat = (start = undefined, add = 0, unit = 's', format = undefined) => {
  const x = !!start && start !== 'now' ? moment(start) : moment();
  x.add(add, unit)
  if (!format) {
    return x.format();
  }
  if (format === 'unixms') {
    return x.valueOf();
  }
  if (format === 'unix') {
    return x.unix();
  }
  return x.format(format)
}

module.exports.templateTags = [
  {
    name: "momenttag",
    displayName: "momenttag",
    description: "momenttag",
    args: [
      {
        displayName: 'Start',
        type: 'string',
        placeHolder: 'now | 2020-06-16 | 2020-06-16T08:00:00 | 2020-06-16T08:00:00.34Z'
      },
      {
        displayName: 'Add',
        type: 'number',
        placeHolder: 'service to resolve'
      },
      {
        displayName: 'Add unit',
        type: 'enum',
        options: [
          { displayName: 'millieseconds', value: 'ms' },
          { displayName: 'seconds', value: 's' },
          { displayName: 'minutes', value: 'm' },
          { displayName: 'hours', value: 'h' },
          { displayName: 'days', value: 'd' },
          { displayName: 'weeks', value: 'w' },
          { displayName: 'months', value: 'M' },
          { displayName: 'quarters', value: 'Q' },
          { displayName: 'years', value: 'y' },
        ],
      },
      {
        displayName: 'Format',
        type: 'string',
        placeHolder: 'unixms | unix | YYYY MM DD | [Today is] dddd'
      }
    ],
    liveDisplayName(args) {
      const actual = parseManipulateFormat(args[0].value, args[1].value, args[2].value, args[3].value);
      const humanReadable = parseManipulateFormat(args[0].value, args[1].value, args[2].value);
      if (actual === humanReadable) {
        return `moment => ${actual}`;
      }
      return `moment => ${actual} (${humanReadable})`;
    },
    async run(context, start = undefined, add = 0, unit = 's', format = undefined) {
      return parseManipulateFormat(start, add, unit, format);
    }
  }
];