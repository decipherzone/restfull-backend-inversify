/**
 * Created by Raja Dushyant Vashishtha on 23/5/17.
 * email rajad@decipherzone.com
 *
 * Description : $Description$
 */

export class Utility {
    public static isNull(o: any): boolean {
        if (typeof o !== "undefined" || o !== undefined)
            return false;
        return true;
    }
}