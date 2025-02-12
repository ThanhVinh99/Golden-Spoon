export const getObjectById = (id,data) => {
  const  object = data?.find(e => e.id === id) ;
    return  object ? object : "unknown"
}