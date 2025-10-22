<template>
  <div class="p-4 bg-white rounded shadow-sm" style="max-width: 560px">
    <h1 class="h4">Add Book (UI only)</h1>
    <form class="mt-3">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input class="form-control" placeholder="e.g. Clean Code" />
      </div>
      <div class="mb-3">
        <label class="form-label">Author</label>
        <input class="form-control" placeholder="e.g. Robert C. Martin" />
      </div>
      <button type="button" class="btn btn-primary" disabled>Save (disabled)</button>
    </form>
  </div>
</template>
