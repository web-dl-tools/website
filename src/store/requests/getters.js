export const get = state => state.item;

export const getLogs = state => state.item_logs;

export const getFiles = state => state.item_files;

export const getById = state => id => state.items.find(item => item.id === id);

export const getAll = state => state.items;

export const getAllActive = state =>
  state.items
    .filter(i =>
      ["pre_processing", "downloading", "post_processing"].includes(i.status)
    )
    .concat(state.items.filter(i => i.status === "pending"));

export const getAllPending = state =>
  state.items.filter(i => i.status === "pending");

export const getAllProcessing = state =>
  state.items.filter(i =>
    ["pre_processing", "downloading", "post_processing"].includes(i.status)
  );

export const getAllCompleted = state =>
  state.items.filter(i => i.status === "completed");

export const getAllFailed = state =>
  state.items.filter(i => i.status === "failed");
