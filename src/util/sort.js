export function byName(a, b) {
    const alpha = a.name.toLowerCase();
    const beta = b.name.toLowerCase();
    if (alpha < beta) return -1;
    if (beta < alpha) return 1;
    return 0;
}

export function sortDescBy(field){
    return function(a, b){
        if (a[field] > b[field])
         return -1;
      if (a[field] < b[field])
        return 1;
      return 0;
    };
}

export function sortAscBy(field){
    return function(a, b){
        if (a[field] < b[field])
         return -1;
      if (a[field] > b[field])
        return 1;
      return 0;
    };
}