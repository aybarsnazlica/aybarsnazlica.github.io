//
//  VersionInfo.swift
//  IgniteStarter
//
//  Created by Aybars Nazlica on 2025/06/06.
//

import Ignite

struct VersionInfo: HTML {
    var body: some HTML {
        Text("© \(Date.now.formatted(.dateTime.year())) Aybars Nazlica")
            .horizontalAlignment(.center)
            .foregroundStyle(.darkGray)
    }
}
