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

        let cards = [
            Card {
                Link(
                    Image(systemName: "terminal", description: "PixelateCLI")
                        .font(.system(size: 100))
                        .foregroundStyle(.tomato),
                    target: "https://github.com/aybarsnazlica/PixelateCLI"
                )
            } header: {
                "PixelateCLI"
            }
            .fontWeight(.semibold)
        ]

        Grid(alignment: .leading) {
            ForEach(cards) { card in
                card
                    .frame(maxWidth: 150)
            }
        }
    }
}
