# Repository
used to perform CRUD operations on an `entityType`
## find
returns a result array based on the provided options
### limit
Determines the number of rows returned by the request, on the browser the default is 100 rows
#### example
```ts
await this.remult.repo(Products).find({
 limit:10,
 page:2
})
```

### page
Determines the page number that will be used to extract the data
#### example
```ts
await this.remult.repo(Products).find({
 limit:10,
 page:2
})
```

### load
### where
filters the data
#### example
```ts
await taskRepo.find({where: { completed:false }})
```

#### see
For more usage examples see [EntityFilter](https://remult.dev/docs/entityFilter.html)

### orderBy
Determines the order of items returned .
#### example
```ts
await this.remult.repo(Products).find({ orderBy: { name: "asc" }})
```

#### example
```ts
await this.remult.repo(Products).find({ orderBy: { price: "desc", name: "asc" }})
```

## findFirst
returns the first item that matchers the `where` condition
### load
### where
filters the data
#### example
```ts
await taskRepo.find({where: { completed:false }})
```

#### see
For more usage examples see [EntityFilter](https://remult.dev/docs/entityFilter.html)

### orderBy
Determines the order of items returned .
#### example
```ts
await this.remult.repo(Products).find({ orderBy: { name: "asc" }})
```

#### example
```ts
await this.remult.repo(Products).find({ orderBy: { price: "desc", name: "asc" }})
```

### useCache
determines if to cache the result, and return the results from cache.
### createIfNotFound
If set to true and an item is not found, it's created and returned
## findId
returns the items that matches the idm the result is cached unless specified differently in the `options` parameter
## query
An alternative form of fetching data from the API server, which is intended for operating on large numbers of entity objects.
### example
```ts
for await (const task of taskRepo.query()) {
  // do something.
}
```

### load
### where
filters the data
#### example
```ts
await taskRepo.find({where: { completed:false }})
```

#### see
For more usage examples see [EntityFilter](https://remult.dev/docs/entityFilter.html)

### orderBy
Determines the order of items returned .
#### example
```ts
await this.remult.repo(Products).find({ orderBy: { name: "asc" }})
```

#### example
```ts
await this.remult.repo(Products).find({ orderBy: { price: "desc", name: "asc" }})
```

### pageSize
The number of items to return in each step
### progress
A callback method to indicate the progress of the iteration
## count
Returns a count of the items matching the criteria.
### see
[EntityFilter](http://remult.dev/docs/entityFilter.html)
### example
```ts
await taskRepo.count({ completed:false })
```

## save
saves an item or item[] to the data source. It assumes that if an `id` value exists, it's an existing row - otherwise it's a new row
### example
```ts
await taskRepo.save({...task, completed:true })
```

## insert
Insert an item or item[] to the data source
### example
```ts
await taskRepo.insert({title:"task a"})
```

### example
```ts
await taskRepo.insert([{title:"task a"}, {title:"task b", completed:true }])
```

## update
Updates an item, based on it's `id`
### example
```ts
taskRepo.update(task.id,{...task,completed:true})
```

## delete
Deletes an Item
## create
Creates an instance of an item. It'll not be saved to the data source unless `save` or `insert` will be called for that item
## fromJson
Translates a json object to an item instance
## getEntityRef
returns an `entityRef` for an item returned by `create`, `find` etc...
## metadata
The metadata for the `entity`
## addEventListener
