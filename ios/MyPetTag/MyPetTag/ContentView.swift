//
//  MyPetTag - All rights reserved (c) 2023
//
//  Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan, Kyle Charlton
//

import SwiftUI
import WebKit

struct ContentView: View {
    var body: some View {
        WebView(url: URL(string: "https://mypettag-5970e.web.app")!).background(Color("AppBackground"))
            .onAppear {
            UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
                        if granted {
                            print("Notification permission granted")
                        } else {
                            print("Notification permission denied: \(error?.localizedDescription ?? "")")
                        }
            }
        }
    }
}

struct WebView: UIViewRepresentable {
    let url: URL
    func makeUIView(context: Context) -> WKWebView { WKWebView()}
    func updateUIView(_ webView: WKWebView, context: Context) {
        webView.load(URLRequest(url: self.url))
    }
}

#Preview {
    ContentView()
}
