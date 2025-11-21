<script>
export default {
    props: ["phone_Number"],
    data() {
        return {
            //Object of country phone codes, e.g. the uk is GB and +44
            //model: defineModel(),
            country_Codes:
                { bd: "880", be: "32", bf: "226", bg: "359", ba: "387", bb: "-245", wf: "681", bl: "590", bm: "-440", bn: "673", bo: "591", bh: "973", bi: "257", bj: "229", bt: "975", jm: "-875", bw: "267", ws: "685", bq: "599", br: "55", bs: "-241", je: "-1490", by: "375", bz: "501", ru: "7", rw: "250", rs: "381", tl: "670", re: "262", tm: "993", tj: "992", ro: "40", tk: "690", gw: "245", gu: "-670", gt: "502", gr: "30", gq: "240", gp: "590", jp: "81", gy: "592", gg: "-1437", gf: "594", ge: "995", gd: "-472", gb: "44", ga: "241", sv: "503", gn: "224", gm: "220", gl: "299", gi: "350", gh: "233", om: "968", tn: "216", jo: "962", hr: "385", ht: "509", hu: "36", hk: "852", hn: "504", ve: "58", pr: "-786", ps: "970", pw: "680", pt: "351", sj: "47", py: "595", iq: "964", pa: "507", pf: "689", pg: "675", pe: "51", pk: "92", ph: "63", pn: "870", pl: "48", pm: "508", zm: "260", eh: "212", ee: "372", eg: "20", za: "27", ec: "593", it: "39", vn: "84", sb: "677", et: "251", so: "252", zw: "263", sa: "966", es: "34", er: "291", me: "382", md: "373", mg: "261", mf: "590", ma: "212", mc: "377", uz: "998", mm: "95", ml: "223", mo: "853", mn: "976", mh: "692", mk: "389", mu: "230", mt: "356", mw: "265", mv: "960", mq: "596", mp: "-669", ms: "-663", mr: "222", im: "-1580", ug: "256", tz: "255", my: "60", mx: "52", il: "972", fr: "33", io: "246", sh: "290", fi: "358", fj: "679", fk: "500", fm: "691", fo: "298", ni: "505", nl: "31", no: "47", na: "264", vu: "678", nc: "687", ne: "227", nf: "672", ng: "234", nz: "64", np: "977", nr: "674", nu: "683", ck: "682", xk: "0", ci: "225", ch: "41", co: "57", cn: "86", cm: "237", cl: "56", cc: "61", ca: "1", cg: "242", cf: "236", cd: "243", cz: "420", cy: "357", cx: "61", cr: "506", cw: "599", cv: "238", cu: "53", sz: "268", sy: "963", sx: "599", kg: "996", ke: "254", ss: "211", sr: "597", ki: "686", kh: "855", kn: "-868", km: "269", st: "239", sk: "421", kr: "82", si: "386", kp: "850", kw: "965", sn: "221", sm: "378", sl: "232", sc: "248", kz: "7", ky: "-344", sg: "65", se: "46", sd: "249", do: "-808", dm: "-766", dj: "253", dk: "45", vg: "-283", de: "49", ye: "967", dz: "213", us: "1", uy: "598", yt: "262", um: "1", lb: "961", lc: "-757", la: "856", tv: "688", tw: "886", tt: "-867", tr: "90", lk: "94", li: "423", lv: "371", to: "676", lt: "370", lu: "352", lr: "231", ls: "266", th: "66", tg: "228", td: "235", tc: "-648", ly: "218", va: "379", vc: "-783", ae: "971", ad: "376", ag: "-267", af: "93", ai: "-263", vi: "-339", is: "354", ir: "98", am: "374", al: "355", ao: "244", as: "-683", ar: "54", au: "61", at: "43", aw: "297", in: "91", ax: "340", az: "994", ie: "353", id: "62", ua: "380", qa: "974", mz: "258" },
            dropdown_Button: "https://flagcdn.com/16x12/gb.png",
            dialing_Code: "+44",
            phone_Text: ""
        }
    },
    methods: {
        //returns the country codes/property names of the country codes object
        country_Code_Letters() {
            const country_Parsed = this.country_Codes;
            return Object.getOwnPropertyNames(country_Parsed);
        },
        //returns the country code values of the country code object
        country_Code_Numbers() {
            const country_Parsed = this.country_Codes;
            return Object.values(country_Parsed);
        },
        //returns a array flag cdn link to an images of countries based on the country codes object properties
        country_Code_Flag() {
            let country_Parsed = this.country_Codes;
            country_Parsed = Object.getOwnPropertyNames(country_Parsed);
            country_Parsed.forEach((element, index) => country_Parsed[index] = "https://flagcdn.com/16x12/" + element + ".png");
            return country_Parsed;
        },
        model_Update(data, data2, index) {
            this.$emit('toggle-phone-input', "+" + this.country_Code_Numbers()[index] + " " + data2);
            this.dialing_Code="+" +this.country_Code_Numbers()[index]+" ";
            //this.model = data;
            this.dropdown_Button = data;
        }
    }
}
</script>

<template>
    <div class="col-xs-4">
        <label for="phone" class="form-label">Phone Number</label>
        <div class="input-group w-25" id="phone">
            <div class="input-group-prepend">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false"><img :src="dropdown_Button"></img>
                    </button>
                    <ul class="dropdown-menu" style="max-height: 250px; overflow-y: scroll;">
                        <li v-for="(country_Code, index) in country_Code_Numbers()"
                            @click="model_Update(country_Code_Flag()[index], this.phone_Text, index)"><a
                                class="dropdown-item"><img :src="country_Code_Flag()[index]"> +{{ country_Code
                                }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with dropdown button" v-model="phone_Text" @input="this.$emit('toggle-phone-input', dialing_Code+phone_Text)">
        </div>
    </div>
</template>
