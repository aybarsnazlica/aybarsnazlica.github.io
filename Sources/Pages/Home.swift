import Foundation
import Ignite

struct Home: StaticPage {
    var title = "Home"
    var bio = """
        I'm **Aybars Nazlica**, a data scientist at Molcure Inc. in Japan.
        """

    var body: some HTML {
        NavBar()
            .margin(.bottom, .xLarge)
        
        Text("Hello 👋")
            .font(.lead)
            .fontWeight(.medium)
        
        Text(markdown: bio)
            .font(.lead)
            .fontWeight(.medium)
            .lineSpacing(1.25)
            .margin(.bottom, .xLarge)
    }
}
