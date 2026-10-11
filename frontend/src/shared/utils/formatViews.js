
function formatViews(count) {
    if(count >= 1000000) {
        return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M views';
    }

    if (count >= 1000) {
        return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K views';
    }
    return count + ' views';
}

export { formatViews };
