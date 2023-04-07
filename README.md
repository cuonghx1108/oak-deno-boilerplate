To-dos:
production:
- vendor
test:
- testing: https://deno.land/manual@v1.32.3/basics/testing
ci-cd:
- https://deno.land/manual@v1.32.3/advanced/continuous_integration

### Commands
```shell
#reload everything
deno cache --reload server.ts
# auto create lock-file
deno cache --lock=deno.lock --lock-write src/deps.ts
```
- https://deno.land/manual@v1.28.3/references/cheatsheet