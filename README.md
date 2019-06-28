# TruHiker

Create and share your pack lists, submit your lists for community shakedowns.

### Feature Roadmap:

- [x] Add GearItem
- [x] Update GearItem
- [x] Delete GearItem
- [x] Style GearItem in list
- [x] Create and manage packlists
- [x] View a packlist
- [x] Signup flow
- [x] Style category table in Packlist
- [x] Splash screen
- [x] Create AppIcon
- [x] Add Packlist title/description to AddGearScreen
- [x] Remove items from Packlist
- [x] Configure TextInput "Next" action in GearItemScreen
- [x] Add timestamps to docs
- [ ] Look into using Subcollections for Packlist categories
- [ ] Toggle consumable/worn items in Packlist
- [ ] Adjust GearItem quantity in Packlist
- [ ] Display price in GearListItem
- [ ] Add pie chart and total category weights view
- [ ] Style list item in MyGearListsScreen
- [ ] Way to change order of categories/items in categories
- [ ] Search Gear Closet
- [ ] Open gear links in WebView
- [ ] Display + Upload GearItem image
- [ ] Create a new GearItem when adding items to a category
- [ ] Cloud function to update item in  Packlist when updated in the Gear Closet
- [ ] Landing screen
- [ ] Anon signin/signup
- [ ] Forgot password flow
- [ ] Email/phone verification
- [ ] Error handling

- [ ] Edit Catgory name
- [ ] Some way of marking "wishlist" items (so they don't show up when adding items to lists)
- [ ] Ability to switch category when GearCloset modal is open

- [ ] Google Auth
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
