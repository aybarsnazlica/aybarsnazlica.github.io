import Foundation
import Ignite

struct MainLayout: Layout {
    var body: some Document {
        Body {
            NavBar()
                .padding(.bottom, .xLarge)

            content
                .padding(.bottom, .xLarge)
            
            Divider()
            
            Section {
                SocialFooter()
                IgniteFooter()
                VersionInfo()
                    .margin(.bottom, .xLarge)
            }
        }
    }
}
