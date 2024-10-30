
class Helper {
  static async capitalize(string: string): Promise<string> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static async casing(searchTerms: string[]): Promise<RegExp[]> {
    return searchTerms.map((term) => new RegExp(term, 'i'));
  }

}

export default Helper;
