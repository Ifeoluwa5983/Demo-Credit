
class Helper {
  static async capitalize(string: string): Promise<string> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}

export default Helper;
