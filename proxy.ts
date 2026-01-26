import { NextRequest, NextResponse } from "next/server";
import { defaultLocale as DEFAULT_LOCALE, locales, locales as LOCALES } from "./lib/i18n";
import { cookies } from "next/headers";

export async function  proxy(req: NextRequest, _: NextResponse) {
  const Cookies =  await cookies()

  const { pathname } = req.nextUrl;

  const PUBLIC_FILE = /\.(.*)$/;
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api")) {
    return;
  }
 const cookieLocale = req.cookies.get("lang")?.value;
 const currentUrlLang = pathname.split("/")[1] as "en" | "ar";
 let locale = cookieLocale;



//  if(currentUrlLang && )
  if( currentUrlLang && !locales.includes(currentUrlLang) ) {
  return NextResponse.next();

  }

   if(currentUrlLang && currentUrlLang !== cookieLocale) { 
    Cookies.set("lang" , currentUrlLang || "en" )
    const url = req.nextUrl.clone();
    // url.pathname = `/${currentUrlLang}${pathname}`;
    return NextResponse.redirect(url);
  }

  if(!locale) { 
    Cookies.set("lang" , currentUrlLang || "en" )
    const url = req.nextUrl.clone();
    url.pathname = `/${currentUrlLang}${pathname}`;
    locale = currentUrlLang;
    return NextResponse.redirect(url);
  }


  if(!currentUrlLang){ 
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }



  const pathLocale = pathname.split("/")[1] as "en" | "ar";
  if (!locale && LOCALES.includes(pathLocale)) {
    locale = pathLocale;
  }

  if (!locale) locale = DEFAULT_LOCALE;

    if (!LOCALES.includes((pathname?.split("/")[1] as "en" | "ar") || locale)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
