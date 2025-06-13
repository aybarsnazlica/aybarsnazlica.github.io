import Foundation
import Ignite

@main
struct IgniteWebsite {
    static func main() async {
        var site = MySite()

        do {
            try await site.publish()
        } catch {
            print(error.localizedDescription)
        }
    }
}

struct MySite: Site {
    var name = "Aybars Nazlica"
    var titleSuffix = " – Aybars Nazlica"
    var url = URL(static: "https://aybarsnazlica.github.io")
    var builtInIconsEnabled = true

    var author = "Aybars Nazlica"

    var homePage = Home()
    var layout = MainLayout()
}
