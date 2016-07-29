Beep Boop Conversation Store for Slapp
===========================================

This is an implementation of the conversation store interface for 
[slapp](https://github.com/BeepBoopHQ/slapp) for Slack apps running on
[Beep Boop](https://beepboophq.com).

## Install

```
npm install --save slapp-convo-beepboop
```

## Use

```
const Slapp = require('slapp')
const BeepBoopConvoStore = require('slapp-convo-beepboop')

var slapp = Slapp({
  convo_store: new BeepBoopConvoStore(),
})
```

Optionally pass an options object to the `BeepBoopConvoStore` constructor.

The following options are supported
- `debug` boolean`
- `logger` - defaults to null - Should be an object w/ a debug and error function.
- `provider` - `beepboop` (default) or `memory`. If set to `beepboop`, will also fallback to `memory` if config cannot be inferred and not running on Beep Boop

When running on Beep Boop all of the configuration for the store is handled automatically.
