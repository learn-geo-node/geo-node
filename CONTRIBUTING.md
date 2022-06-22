# Contributing

## App Structure

* `src/` main app folder
* `src/db` orm/db configuration
* `src/modules/` - specific modules like User or Auth,
* `src/services/` - external services, ex. 3rd-party API
* `src/utils/` - global utilities that can be used anywhere in the project
* `src/errors` - error classes definition
* `db/` - seeds & migrations, also dummy data if needed
* `src/index.ts` - app's entry point,
* `src/server.ts` - app's entry point function implementation,
* `types.ts` - common interfaces & types definition

## Coding conventions

### Git - branch naming

Branches should comply with: `xxx/pr-topic` format, where `XXX` stands for:

* `IMP` - improvement
* `CHORE` - developer's stuff (i.e. setting up stuff that is not noticeable by users)
* `FEAT` - feature
* `FIX` - fix
* `REFACTOR` - refactoring

### Git - commit messages

Commit messages should include the following information in the respective lines:

`commit 1`:

```
XXX(Main Topic): Brief description
* Details about some stuff
* More details about changes in a commit
```

`commit 2`:

```
XXX(Main Topic): Another brief description
* Details
```
