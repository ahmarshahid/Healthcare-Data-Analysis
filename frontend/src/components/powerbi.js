import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

function Powerbi() {
    
  return (
    <div className="jkl">
      <header className="App-header">
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: "82b53479-b98d-40fc-89bb-c43a6fefb7fe",
            embedUrl:
              "https://app.powerbi.com/reportEmbed?reportId=82b53479-b98d-40fc-89bb-c43a6fefb7fe&groupId=a7b0dbf2-070a-40a7-998b-2278f080c77f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
            accessToken:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMWQ3YWEyZTktM2ExYS00YWY0LTk4NzMtMzFjYzY2NzQ5NjllLyIsImlhdCI6MTcxNTA2ODI4MiwibmJmIjoxNzE1MDY4MjgyLCJleHAiOjE3MTUwNzMyODksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUE2MVpZY3dhVjBua1NmcCtSRjAxUlB5YThiNC9tcUpYRXpDTWtONVNlTURlaVJBRXpFM241aThEZjFlUXUwL0tRIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiU2hhaGlkIiwiZ2l2ZW5fbmFtZSI6Ik11aGFtbWFkIEFobWFyIiwiaXBhZGRyIjoiMTExLjY4LjEwMi4yNSIsIm5hbWUiOiJNdWhhbW1hZCBBaG1hciBTaGFoaWQiLCJvaWQiOiJlZDgwNDFkNS04ZjM0LTQyMGQtYTVkYy1hNjU4ODQzNGY5NmEiLCJwdWlkIjoiMTAwMzIwMDM3NDk4Qjg3QSIsInJoIjoiMC5BVjRBNmFKNkhSbzY5RXFZY3pITVpuU1duZ2tBQUFBQUFBQUF3QUFBQUFBQUFBQVJBYWMuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiY3hWUFl1M21SQmJQUDlXbnRFV3BSM1pZZ095a3VxYVMwQ0NwRGRUa1RMTSIsInRpZCI6IjFkN2FhMmU5LTNhMWEtNGFmNC05ODczLTMxY2M2Njc0OTY5ZSIsInVuaXF1ZV9uYW1lIjoiMjAyMmNzMjA2QHN0dWRlbnQudWV0LmVkdS5wayIsInVwbiI6IjIwMjJjczIwNkBzdHVkZW50LnVldC5lZHUucGsiLCJ1dGkiOiJDMWxaazk2RVBFS2R4SmpOLXdZQkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.HmZ3sPytbxd0cQA65D9emOPFI4pd9VkG4Bjz__PfbMxWm8Zkg9Slv6qsDweqcF7laIgML_thY8P1xkrEpAWrtI69VOQex0qTGxLJk2Cnc8Ht4_TwFHzXNKkCpH8u0crBf7HNUjcM1Qz_3Xg3VnUpQetHUerHGz6GOnXmRqTLptdkj-LV5ijGS9oRj9jfA5vk9-D1veXmMKzIJCvKbi5oDyaytp2x5t6oXMTzc5tGVPecEVSJKoVUU-v-CDAHQYHd1JuQG3WXp9tg17jonNpHBvf-IBSFMvDgKpx9NN-OjaLX-2GQMllTocRakP86rMYe7BtddyNAJP9ef2A1lC3rfQ",
            // AccessToken will be expired after every 1 hour so we need to check for time that how long the access token has been
            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false,
                },
              },
              //background: models.BackgroundType.Transparent,
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded");
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered");
                },
              ],
              [
                "error",
                function (event) {
                  console.log(event.detail);
                },
              ],
              ["visualClicked", () => console.log("visual clicked")],
              ["pageChanged", (event) => console.log(event)],
            ])
          }
          cssClassName={"Bi-class"}
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      </header>
    </div>
  );
}

export default Powerbi;