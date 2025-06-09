import Foundation
import Ignite

struct Home: StaticPage {
    var title = "Home"
    var bio = """
        Hi! I'm **Aybars**, I develop apps for iOS and macOS.
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
            (
                "Pixelate",
                Image(systemName: "image", description: "Pixelate")
                    .resizable()
                    .font(.system(size: 80))
                    .foregroundStyle(.tomato),
                "https://github.com/aybarsnazlica/Pixelate"
            ),
            (
                "Splay",
                Image(systemName: "window-stack", description: "Splay")
                    .resizable()
                    .font(.system(size: 80))
                    .foregroundStyle(.lightBlue),
                "https://github.com/aybarsnazlica/Splay"
            ),
        ]

        VStack(alignment: .leading) {
            HStack {
                ForEach(projects) { (name, image, urlString) in
                    Card {
                        image
                            .margin(.medium)
                        Link(name, target: urlString)
                            .target(.blank)
                            .role(.secondary)
                            .relationship(.noOpener, .noReferrer)
                    }
                }
            }
        }
        .font(.lead)
    }
}
