import Foundation
import Ignite

struct Home: StaticPage {
    var title = "Home"
    private let bio = """
        I'm a data scientist at Molcure Inc. in Japan.
        """

    var body: some HTML {
        Text("Aybars Nazlica")
            .font(.title1)
            .fontWeight(.bold)
            .margin(.top)

        Text(markdown: bio)
            .fontWeight(.medium)
            .font(.lead)
            .lineSpacing(1.25)
            .margin(.top, .xLarge)

        Text("© 2025 Aybars Nazlica")
            .margin(.top, .xLarge)
    }
}
