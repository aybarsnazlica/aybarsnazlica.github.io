//
//  SocialFooter.swift
//  IgniteStarter
//
//  Created by Aybars Nazlica on 2025/06/06.
//

import Ignite

struct SocialFooter: HTML {
    let icons = [
        Image(systemName: "github", description: "My GitHub Overview Page"),
        Image(systemName: "linkedin", description: "My Linkedin Page")
    ]

    let urlStrings = [
        "https://github.com/aybarsnazlica",
        "https://www.linkedin.com/in/aybars-nazlica/",
    ]

    var body: some HTML {
        VStack {
            HStack {
                ForEach(zip(icons, urlStrings)) { (icon, urlString) in
                    Link(icon, target: urlString)
                        .target(.blank)
                        .relationship(.noOpener, .noReferrer)
                }
            }
        }
        .margin(.top, .xLarge)
        .font(.title2)
    }
}
