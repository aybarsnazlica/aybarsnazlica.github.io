import Foundation
import Ignite

struct Home: StaticPage {
    var title = "Home"
    var intro = "Hi! I'm **Aybars**!"
    var summary = """
        I like developing mobile, desktop and command-line apps. I currently live in Hokkaido, Japan.
        """
    var body: some HTML {
        NavBar()
            .margin(.bottom, .xLarge)

        Text(markdown: intro)
            .font(.title4)
            .fontWeight(.medium)
            .lineSpacing(1.25)
            .margin(.bottom, .xLarge)

        Text(markdown: summary)
            .font(.lead)
            .fontWeight(.medium)
            .lineSpacing(1.25)
            .margin(.bottom, .xLarge)

        Text("Here are the projects I've been working on ↓")
            .font(.lead)
            .fontWeight(.semibold)
            .margin(.bottom, .xLarge)

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
            (
                "compseq",
                Image(systemName: "card-text", description: "compseq")
                    .resizable()
                    .font(.system(size: 80))
                    .foregroundStyle(.sandyBrown),
                "https://github.com/aybarsnazlica/compseq"
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
