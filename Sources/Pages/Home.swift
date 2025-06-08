import Foundation
import Ignite

struct Home: StaticPage {
    var title = "Home"
    var bio = """
        Hi! I'm **Aybars**, a data scientist at Molcure, Japan.
        """

    var body: some HTML {
        NavBar()
            .margin(.bottom, .xLarge)

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

        VStack(alignment: .leading) {
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
        .font(.lead)
    }
}
