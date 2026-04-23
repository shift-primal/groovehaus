export function priceRange(min: number, max: number): number[] {
    const result: number[] = [];
    for (let p = 49; p <= max; p += 50) {
        if (p >= min) result.push(p);
    }
    return result;
}

export function slugify(string: string = ''): string {
    return string
        .toLowerCase() // Lower case all characters
        .replaceAll('$', 's') // Replace $ with s (for $uicideboy$)
        .normalize('NFKD') //for example è decomposes to as e +  ̀
        .replaceAll(/[\u0300-\u036F]/g, '') // removes combining marks
        .replaceAll(' ', '-') // replaces spaces with hyphens
        .replaceAll(/[^\w.-]+/g, ''); // removes all non-word characters except for dots and hyphens
}
