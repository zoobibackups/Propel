const binarySearch = (d, t, s, e) => {
  const m = Math.floor((s + e) / 2);
  if (t == d[m].mobile_number) return d[m];
  if (e - 1 === s)
    return d[s].mobile_number - t > d[e].mobile_number - t ? d[e] : d[s];
  if (t > d[m].mobile_number) return binarySearch(d, t, m, e);
  if (t < d[m].mobile_number) return binarySearch(d, t, s, m);
};
export default binarySearch;
