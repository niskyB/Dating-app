export const getRoomId = (currentId: string, targetId: string) => {
  let room = "";
  if (currentId.localeCompare(targetId) < 1) {
    room = currentId + "@" + targetId;
  } else {
    room = targetId + "@" + currentId;
  }
  return room;
};
