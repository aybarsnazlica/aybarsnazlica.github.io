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

        Text("My Projects")
            .font(.lead)
            .fontWeight(.semibold)

        let projects = [
            (   "PixelateCLI",
                Image(systemName: "terminal", description: "PixelateCLI")
                    .font(.system(size: 80))
                    .foregroundStyle(.tomato),
                "https://github.com/aybarsnazlica/PixelateCLI"
            ),
        ]

        VStack {
            HStack {
                ForEach(projects) { (name, image, urlString) in
                    image
                    
                    Link(name, target: urlString)
                        .target(.blank)
                        .role(.secondary)
                        .relationship(.noOpener, .noReferrer)
                }
            }
        }
        .margin(.top, .xLarge)
        .font(.lead)
    }
}
