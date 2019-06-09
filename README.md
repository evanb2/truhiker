# TruHiker

Create and share your pack lists, submit your lists for community shakedowns.

### Proposed Feature List:

- [ ] Update GearItem
- [ ] Anon signin
- [ ] Google Auth
- [ ] Create and manage gear lists
- [ ] Add to and manage gear closet
- [ ] Share public pack lists.
- [ ] Allow others to leave general or item-specific comments on your public lists.
- [ ] Share planned hikes/trips with users near your designated location.
- [ ] Subscribe to receive notifications when a user is planning a hike near you
- [ ] Allow users to search pack list db for lists containing a specific item
- [ ] Allow users to rate public pack lists (?)

### Bugs / Solutions
```bash
Undefined symbols for architecture x86_64:
  "_JSClassCreate", referenced from ... libReact.a
```
Solution: Make sure `JavascriptCore.framework` is added above `libReact.a` under "Linked Frameworks and Libraries"

Keep an eye on [this](https://github.com/firebase/firebase-js-sdk/issues/1824) firebase issue.
